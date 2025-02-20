
import { Box, Divider, Typography } from '@mui/material';

import { SettingsEnum } from 'main/sentient-sims/models/SettingsEnum';
import { ApiType } from 'main/sentient-sims/models/ApiType';
import {
  novelaiDefaultEndpoint,
  novelaiDefaultModel,
  openaiDefaultEndpoint,
  openaiDefaultModel,
} from 'main/sentient-sims/constants';
import { LoadingButton } from '@mui/lab';
import AppCard from './AppCard';
import DebugLogsSettingsComponent from './settings/DebugLogsSettingsComponent';
import LocalizationSettingsComponent from './settings/LocalizationSettingsComponent';
import OpenAISettingsComponent from './settings/OpenAISettingsComponent';
import { AISelectionComponent } from './settings/AISelectionComponent';
import { AnimationMappingSettingsComponent } from './settings/AnimationMappingSettingsComponent';
import { KoboldAISettingsComponent } from './settings/KoboldAISettingsComponent';
import { SentientSimsSettingsComponent } from './settings/SentientSimsSettingsComponent';
import ApiKeyAIComponent from './ApiKeyAIComponent';
import { AIEndpointComponent } from './settings/AIEndpointComponent';
import AIModelSelection from './AIModelSelection';
import { ModsDirectoryComponent } from './ModsDirectoryComponent';
import { AIStatusComponent } from './AIStatusComponent';
import { useAISettings } from './providers/AISettingsProvider';
import NovelAISettingsComponent from './settings/NovelAISettingsComponent';
// [NEW] Added import for GeminiSettingsComponent
import GeminiSettingsComponent from './settings/GeminiSettingsComponent';

export default function SettingsPage() {
  const aiSettings = useAISettings();

  return (
    <AppCard>
      <Typography>Settings</Typography>
      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      <ModsDirectoryComponent />
      <DebugLogsSettingsComponent />
      <AISelectionComponent />
      <Box display="flex" alignItems="center" sx={{ marginBottom: 3 }}>
        <LoadingButton
          loading={aiSettings.aiStatus.loading}
          onClick={() => aiSettings.testAI()}
          sx={{ marginRight: 2 }}
          color="primary"
          variant="outlined"
        >
          Test
        </LoadingButton>
        <AIStatusComponent />
      </Box>
      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      <OpenAISettingsComponent apiType={aiSettings.aiApiType}>
        <ApiKeyAIComponent setting={SettingsEnum.OPENAI_KEY} aiName="OpenAI" />
        <AIEndpointComponent
          type={ApiType.OpenAI}
          selectedApiType={ApiType.OpenAI}
          settingsEnum={SettingsEnum.OPENAI_ENDPOINT}
        />
        <AIModelSelection
          apiType={aiSettings.aiApiType}
          defaultModel={openaiDefaultModel}
          defaultEndpoint={openaiDefaultEndpoint}
          modelSetting={SettingsEnum.OPENAI_MODEL}
          endpointSetting={SettingsEnum.OPENAI_ENDPOINT}
        />
        <LocalizationSettingsComponent />
      </OpenAISettingsComponent>
      <NovelAISettingsComponent apiType={aiSettings.aiApiType}>
        <ApiKeyAIComponent
          setting={SettingsEnum.NOVELAI_KEY}
          aiName="NovelAI"
        />
        <AIEndpointComponent
          type={ApiType.NovelAI}
          selectedApiType={ApiType.NovelAI}
          settingsEnum={SettingsEnum.NOVELAI_ENDPOINT}
        />
        <AIModelSelection
          apiType={aiSettings.aiApiType}
          defaultModel={novelaiDefaultModel}
          defaultEndpoint={novelaiDefaultEndpoint}
          modelSetting={SettingsEnum.NOVELAI_MODEL}
          endpointSetting={SettingsEnum.NOVELAI_ENDPOINT}
        />
      </NovelAISettingsComponent>
      <KoboldAISettingsComponent apiType={aiSettings.aiApiType} />
      <SentientSimsSettingsComponent apiType={aiSettings.aiApiType} />
      {/* [NEW] Added GeminiSettingsComponent to display Gemini-specific settings */}
      <GeminiSettingsComponent apiType={aiSettings.aiApiType}>
        <ApiKeyAIComponent setting={SettingsEnum.GEMINI_KEYS} aiName="Gemini" />
        <AIEndpointComponent
          type={ApiType.Gemini}
          selectedApiType={ApiType.Gemini}
          settingsEnum={SettingsEnum.GEMINI_ENDPOINT}
        />
        <AIModelSelection
          apiType={aiSettings.aiApiType}
          defaultModel="gemini-2.0-flash-exp" // [NEW] Default Gemini model
          defaultEndpoint="https://generativelanguage.googleapis.com/v1beta" // [NEW] Default Gemini endpoint
          modelSetting={SettingsEnum.GEMINI_MODEL}
          endpointSetting={SettingsEnum.GEMINI_ENDPOINT}
        />
      </GeminiSettingsComponent>
      <AnimationMappingSettingsComponent apiType={aiSettings.aiApiType} />
    </AppCard>
  );
}
