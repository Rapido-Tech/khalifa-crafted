import { Card } from "@/components/ui/card";

const Welcome = () => {
  return (
    <Card className="flex flex-row px-4 mb-5 mt-5">
      <div className="flex-1">
        <h1 className="text-xl  md:text-6xl font-extrabold font-neoteric tracking-wider text-center cursor-default">
          welcome to khalifa crafted admin dashboard
        </h1>
      </div>
    </Card>
  );
};

export default Welcome;
