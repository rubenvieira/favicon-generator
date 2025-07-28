import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { showLoading, dismissToast, showSuccess, showError } from "@/utils/toast";
import { Download } from "lucide-react";
import EmojiPalette from "@/components/EmojiPalette";

interface GeneratedFavicon {
  size: string;
  url: string;
  filename: string;
}

const FAVICON_SIZES = [
  { size: 16, name: "favicon-16x16.png" },
  { size: 32, name: "favicon-32x32.png" },
  { size: 180, name: "apple-touch-icon.png" },
  { size: 192, name: "android-chrome-192x192.png" },
  { size: 512, name: "android-chrome-512x512.png" },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("image");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  const [generatedFavicons, setGeneratedFavicons] = useState<GeneratedFavicon[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        showError("Please upload a valid image file.");
        return;
      }
      setSelectedImage(file);
      setSelectedEmoji(""); // Clear emoji
      setGeneratedFavicons([]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmojiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emoji = event.target.value;
    setSelectedEmoji(emoji);
    if (emoji) {
      setSelectedImage(null); // Clear image
      setImagePreview(null);
    }
    setGeneratedFavicons([]);
  };

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji);
    if (emoji) {
      setSelectedImage(null); // Clear image
      setImagePreview(null);
    }
    setGeneratedFavicons([]);
  };

  const generateFaviconFromImage = (
    image: HTMLImageElement,
    size: number,
    filename: string,
  ): Promise<GeneratedFavicon> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(image, 0, 0, size, size);
        const url = canvas.toDataURL("image/png");
        resolve({ size: `${size}x${size}`, url, filename });
      } else {
        reject(new Error("Could not get canvas context."));
      }
    });
  };

  const generateFaviconFromEmoji = (
    emoji: string,
    size: number,
    filename: string,
  ): Promise<GeneratedFavicon> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, size, size);
        ctx.font = `${size * 0.8}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(emoji, size / 2, size / 2 + size * 0.05); // Small vertical adjustment for better centering
        const url = canvas.toDataURL("image/png");
        resolve({ size: `${size}x${size}`, url, filename });
      } else {
        reject(new Error("Could not get canvas context."));
      }
    });
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    const toastId = showLoading("Generating favicons...");

    const generateFromImage = () => {
      return new Promise<GeneratedFavicon[]>((resolve, reject) => {
        if (!selectedImage) return reject(new Error("No image selected."));
        const image = new Image();
        image.src = URL.createObjectURL(selectedImage);
        image.onload = async () => {
          try {
            const favicons = await Promise.all(
              FAVICON_SIZES.map((s) => generateFaviconFromImage(image, s.size, s.name)),
            );
            URL.revokeObjectURL(image.src);
            resolve(favicons);
          } catch (err) {
            reject(err);
          }
        };
        image.onerror = () => {
          URL.revokeObjectURL(image.src);
          reject(new Error("Could not load the image."));
        };
      });
    };

    const generateFromEmoji = () => {
      return new Promise<GeneratedFavicon[]>(async (resolve, reject) => {
        if (!selectedEmoji) return reject(new Error("No emoji selected."));
        try {
          const emoji = [...selectedEmoji][0]; // Use the first grapheme
          const favicons = await Promise.all(
            FAVICON_SIZES.map((s) => generateFaviconFromEmoji(emoji, s.size, s.name)),
          );
          resolve(favicons);
        } catch (err) {
          reject(err);
        }
      });
    };

    try {
      const favicons = activeTab === 'image' ? await generateFromImage() : await generateFromEmoji();
      setGeneratedFavicons(favicons);
      dismissToast(toastId);
      showSuccess("Favicons generated successfully!");
    } catch (err: any) {
      dismissToast(toastId);
      showError(err.message || "Failed to generate favicons.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4 md:p-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Favicon Generator
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Create your favicon from an image or an emoji.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="image">From Image</TabsTrigger>
                <TabsTrigger value="emoji">From Emoji</TabsTrigger>
              </TabsList>
              <TabsContent value="image">
                <div className="grid w-full items-center gap-4 p-6 border rounded-lg mt-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="picture" className="text-lg font-medium">
                      1. Upload Your Image
                    </Label>
                    <Input
                      id="picture"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="file:text-primary file:font-semibold"
                    />
                  </div>
                  {imagePreview && (
                    <div className="mt-4">
                      <h3 className="text-md font-medium mb-2">Image Preview:</h3>
                      <div className="border rounded-lg p-4 flex justify-center bg-muted/40">
                        <img
                          src={imagePreview}
                          alt="Selected"
                          className="max-h-48 rounded-md object-contain"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="emoji">
                <div className="grid w-full items-center gap-4 p-6 border rounded-lg mt-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="emoji" className="text-lg font-medium">
                      1. Enter an Emoji
                    </Label>
                    <Input
                      id="emoji"
                      type="text"
                      value={selectedEmoji}
                      onChange={handleEmojiChange}
                      placeholder="e.g., ✨"
                      className="text-4xl h-auto p-4 text-center"
                      maxLength={2}
                    />
                  </div>
                  
                  <EmojiPalette onSelectEmoji={handleEmojiSelect} />

                  {selectedEmoji && (
                    <div className="mt-4">
                      <h3 className="text-md font-medium mb-2">Emoji Preview:</h3>
                      <div className="border rounded-lg p-4 flex justify-center bg-muted/40">
                        <span className="text-7xl">{[...selectedEmoji][0]}</span>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-center">
              <Button
                onClick={handleGenerate}
                disabled={(!selectedImage && !selectedEmoji) || isLoading}
                size="lg"
              >
                {isLoading ? "Generating..." : "2. Generate Favicons"}
              </Button>
            </div>

            {generatedFavicons.length > 0 && (
              <div className="space-y-4 pt-6">
                <h3 className="text-2xl font-semibold text-center">
                  3. Download Your Favicons
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {generatedFavicons.map((favicon) => (
                    <div
                      key={favicon.size}
                      className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="w-16 h-16 flex items-center justify-center bg-muted/40 rounded-md">
                        <img
                          src={favicon.url}
                          alt={`Favicon ${favicon.size}`}
                          className="object-contain"
                          style={{
                            width: `${Math.min(parseInt(favicon.size.split('x')[0]), 64)}px`,
                            height: `${Math.min(parseInt(favicon.size.split('x')[0]), 64)}px`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium">{favicon.size}</span>
                      <span className="text-xs text-muted-foreground">
                        {favicon.filename}
                      </span>
                      <Button asChild variant="outline" size="sm">
                        <a href={favicon.url} download={favicon.filename}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;