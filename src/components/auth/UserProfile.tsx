import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
interface UserProfileProps {
  userToken: string | null | undefined;
}

export default function UserProfile({ userToken }: UserProfileProps) {
  const [userInfo, setUserInfo] = useState<{
    userName: string;
    id: string;
    role: string;
    status: string;
  } | null>(null);

  useEffect(() => {
    if (userToken !== null && userToken !== undefined) {
      const decodedToken: {
        userName: string;
        id: string;
        role: string;
        status: string;
      } = jwtDecode(userToken);
      setUserInfo(decodedToken);
    }
  }, [userToken]);
  return (
    <div className="flex justify-center items-center  my-32">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>Your Personal Information.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              value={userInfo?.userName || ""}
              disabled
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
            <Label htmlFor="id">ID</Label>
            <Input
              type="text"
              id="id"
              value={userInfo?.id || ""}
              disabled
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
            <Label htmlFor="role">Role</Label>
            <Input
              type="text"
              id="role"
              value={userInfo?.role || ""}
              disabled
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
            <Label htmlFor="status">Status</Label>
            <Input
              type="text"
              id="status"
              value={userInfo?.status || ""}
              disabled
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div className="flex flex-col space-y-1.5"></div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Link to="/">
            <Button variant="outline">Back To Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
