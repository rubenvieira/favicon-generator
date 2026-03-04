import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import BackgroundPicker from './customization/BackgroundPicker';
import PaddingControl from './customization/PaddingControl';
import BorderRadiusControl from './customization/BorderRadiusControl';
import ShadowControl from './customization/ShadowControl';
import type { CustomizationSettings, BackgroundSettings } from '@/lib/favicon-types';

interface CustomizationPanelProps {
  customization: CustomizationSettings;
  onCustomizationChange: (settings: Partial<CustomizationSettings>) => void;
  onShadowChange: (shadow: Partial<CustomizationSettings['shadow']>) => void;
  onBackgroundChange: (background: Partial<BackgroundSettings>) => void;
}

export default function CustomizationPanel({
  customization,
  onCustomizationChange,
  onShadowChange,
  onBackgroundChange,
}: CustomizationPanelProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Customize</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <BackgroundPicker
          enabled={customization.backgroundEnabled}
          background={customization.background}
          onEnabledChange={(backgroundEnabled) =>
            onCustomizationChange({ backgroundEnabled })
          }
          onBackgroundChange={onBackgroundChange}
        />

        <Separator />

        <PaddingControl
          value={customization.padding}
          onChange={(padding) => onCustomizationChange({ padding })}
        />

        <Separator />

        <BorderRadiusControl
          value={customization.borderRadius}
          onChange={(borderRadius) => onCustomizationChange({ borderRadius })}
        />

        <Separator />

        <ShadowControl
          shadow={customization.shadow}
          onChange={onShadowChange}
        />
      </CardContent>
    </Card>
  );
}
