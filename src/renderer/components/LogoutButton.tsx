import { Button } from '@mui/material';

export type LogoutButtonProperties = {
  signOut: (data: any) => void;
};

export default function LogoutButton({ signOut }: LogoutButtonProperties) {
  return (
    <Button
      color="warning"
      onClick={signOut}
      sx={{ marginLeft: '5px' }}
      id="logout"
    >
      Logout
    </Button>
  );
}
