"use client";

type QuantitySelectorProps = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

export function QuantitySelector({
  quantity,
  onDecrease,
  onIncrease,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center rounded-xl bg-surface-container-low px-2">
      <button
        type="button"
        onClick={onDecrease}
        className="flex h-10 w-10 items-center justify-center text-on-surface-variant hover:text-primary"
      >
        -
      </button>
      <span className="w-10 text-center font-semibold">{quantity}</span>
      <button
        type="button"
        onClick={onIncrease}
        className="flex h-10 w-10 items-center justify-center text-on-surface-variant hover:text-primary"
      >
        +
      </button>
    </div>
  );
}
