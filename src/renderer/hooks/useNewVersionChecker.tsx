import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import log from 'electron-log';
import { isNewVersionAvailable } from '../versions';

type NewVersionAvailableProps = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  versionType: string;
};
const getCurrentTime = (): string => {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const meridiem = hours >= 12 ? 'pm' : 'am';

  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${meridiem}`;
};
export default function useNewVersionChecker({
  setIsLoading,
  versionType,
}: NewVersionAvailableProps) {
  const [updateState, setUpdateState] = useState({
    newVersionAvailable: false,
    lastChecked: 'N/A',
  });

  const handleCheckForUpdates = useCallback(async () => {
    setIsLoading(true);

    try {
      const modVersionResponse = await fetch(
        'http://localhost:25148/versions/mod'
      );
      const modVersion = await modVersionResponse.json();
      log.debug(`modVersion: ${modVersion}`);
      const response = await isNewVersionAvailable(
        modVersion.version,
        versionType
      );
      const currentTime = getCurrentTime();

      setUpdateState({
        newVersionAvailable: response,
        lastChecked: currentTime,
      });
    } catch (err) {
      log.error('Error checking for updates:', err);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, versionType]);

  useEffect(() => {
    handleCheckForUpdates();
  }, [handleCheckForUpdates, versionType]);

  return { updateState, handleCheckForUpdates };
}
