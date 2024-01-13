import { Button } from "../ui/button";
import { FC } from "react";

type FooterProps = {
  onClearCompleted: () => void;
  footerText: string;
};

const Footer: FC<FooterProps> = ({ footerText, onClearCompleted }) => {
  return (
    <div className="mt-4">
      <p
        className="text-sm text-gray-500 dark:text-gray-400"
        dangerouslySetInnerHTML={{ __html: footerText }}
      ></p>
      <Button className="mt-2" onClick={onClearCompleted}>
        Clear Completed
      </Button>
    </div>
  );
};

export default Footer;
