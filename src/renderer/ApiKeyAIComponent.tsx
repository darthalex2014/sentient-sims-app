import { Box } from '@mui/material';
import { SettingsEnum } from 'main/sentient-sims/models/SettingsEnum';
import APIKeyInput from './APIKeyInput';
import useSetting from './hooks/useSetting';

export type ApiKeyAIComponentProperties = {
  setting: SettingsEnum;
  aiName: string;
};

export default function ApiKeyAIComponent({
  setting,
  aiName,
}: ApiKeyAIComponentProperties) {
  const apiKeySetting = useSetting(setting, '');

  return (
    <Box display="flex" alignItems="center" sx={{ marginBottom: 2 }}>
      <APIKeyInput setting={apiKeySetting} aiName={aiName} />
    </Box>
  );
}
