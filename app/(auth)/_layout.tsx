import { Tabs } from "expo-router";

export default function SignTabs() {
  return (
    <Tabs>
      <Tabs.Screen name="sign-in" options={{ title: "Sign In" }} />
      <Tabs.Screen name="sign-up" options={{ title: "Sign Up" }} />
    </Tabs>
  );
}