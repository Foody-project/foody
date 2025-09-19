import { Button } from "@/components/ui/button";

interface IsOpenProps {
  isOpen: boolean;
}

export default function IsOpen({ isOpen }: IsOpenProps) {
  return (
    <div>
      {isOpen ? (
        <Button
          variant="outline"
          size="sm"
          className="font-thin text-[0.8rem] w-18 p-0 text-green-600 bg-green-100 shadow-[0_0_15px_4px_rgba(34,229,94,0.3)] hover:shadow-[0_0_15px_4px_rgba(34,229,94,0)] hover:text-green-600"
        >
          <section className="bg-green-500 w-3 h-3 rounded-xl shadow-[0_0_15px_4px_rgba(34,197,94,0.3)]"></section>
          Open
        </Button>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="font-thin text-[0.8rem] w-[4.5rem] p-0 text-red-500 border-red-400 bg-red-100 shadow-[0_0_10px_2px_rgba(253,53,94,0.3)] hover:shadow-[0_0_15px_4px_rgba(253,53,94,0.1)] hover:text-red-600"
        >
          <section className="bg-red-500 w-3 h-3 rounded-xl shadow-[0_0_15px_4px_rgba(253, 53, 94,0.3)]"></section>
          Close
        </Button>
      )}
    </div>
  );
}
