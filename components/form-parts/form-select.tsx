export function InputFormSelect({
  options,
  labelText,
  required,
  htmlFor,
  errors,
  id,
  name,
}: {
  options: string[];
  labelText: string;
  required: boolean;
  htmlFor?: string;
  errors?: string[];
  id: string;
  name: string;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-slate-200 mb-2"
      >
        {labelText} <span className="text-red-400">{required ? "*" : ""}</span>
      </label>
      <select
        id={id}
        name={name}
        // value={formData.quality}
        // onChange={handleInputChange}
        className={`w-full bg-slate-600 border rounded-md px-3 py-3 text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all
            ${
              errors?.length
                ? "border-red-500 focus:ring-red-500"
                : "border-slate-600 focus:ring-orange-500"
            }
          `}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {errors?.length &&
        errors.map((err: string) => (
          <p className="mt-2 text-sm text-red-500" key={err}>
            {err}
          </p>
        ))}
    </div>
  );
}
