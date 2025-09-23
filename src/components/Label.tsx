interface LabelProps {
  label?: string;
  color: string;
}

export default function Label({ label, color }: LabelProps) {
  return (
    <span className={`p-2 bg-${color} text-sm rounded-xl text-white`}>
      {label}
    </span>
  );
}
