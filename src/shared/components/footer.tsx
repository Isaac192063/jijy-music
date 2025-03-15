import { Button } from "@/components/ui/button";

export const Footer: React.FC<{ value: string }> = ({ value }) => {
    return  <Button variant="link" className="cursor-pointer">{value}</Button>;;
};
