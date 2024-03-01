import { HowitsWork } from "@/components/shared/HowitsWork";
import { Lamp } from "@/components/shared/Lamp";
import { Newest } from "@/components/shared/Newest";

export default function Home() {
  return (
    <div>
      <Lamp />
      <Newest />
      <HowitsWork />
    </div>
  );
}
