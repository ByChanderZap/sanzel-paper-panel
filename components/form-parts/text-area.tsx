export function InputFormTextarea({
  labelText,
  required = false,
  placeholder,
  id,
  name,
  htmlFor = id,
  errors,
  rows = 3,
}: {
  labelText: string;
  required?: boolean;
  placeholder: string;
  id: string;
  name: string;
  htmlFor?: string;
  errors?: string[];
  rows?: number;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-slate-200 mb-2"
      >
        {labelText} <span className="text-red-400">{required ? "*" : ""}</span>
      </label>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        rows={rows}
        className={`w-full bg-slate-600 border rounded-md px-3 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
          errors?.length
            ? "border-red-500 focus:ring-red-500"
            : "border-slate-600 focus:ring-orange-500"
        }`}
        required={required}
      />
      {errors?.length &&
        errors.map((err: string) => (
          <p className="mt-2 text-sm text-red-500" key={err}>
            {err}
          </p>
        ))}
    </div>
  );
}
