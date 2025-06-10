export function InputFormText({
  labelText,
  required = false,
  type,
  placeholder,
  id,
  name,
  htmlFor = id,
  errors,
}: {
  labelText: string;
  required?: boolean;
  placeholder: string;
  id: string;
  name: string;
  type: "text" | "email" | "tel" | "number";
  htmlFor?: string;
  errors?: string[];
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-slate-200 mb-2"
      >
        {labelText} <span className="text-red-400">{required ? "*" : ""}</span>
      </label>
      <input
        type={type}
        id={id}
        name={name}
        // value={formData.name}
        // onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full bg-slate-600 border border-slate-600 rounded-md px-3 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
        required={required}
      />
    </div>
  );
}
