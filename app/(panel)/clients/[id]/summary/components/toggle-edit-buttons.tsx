import { Save, X, Edit2 } from "lucide-react";
import Link from "next/link.js";

export function ToggleEditButtons({
  isEditing,
  id,
  isPending,
}: {
  isEditing: boolean;
  id: string;
  isPending: boolean;
}) {
  return (
    <div className="flex gap-2 flex-shrink-0">
      {isEditing ? (
        <>
          <button
            type="submit"
            form="client-form"
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-sm sm:text-base"
            disabled={isPending}
          >
            <Save size={16} />
            <span className="hidden sm:inline">Save</span>
          </button>
          <Link
            href={`/clients/${id}/summary`}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors text-sm sm:text-base"
          >
            <X size={16} />
            <span className="hidden sm:inline">Cancel</span>
          </Link>
        </>
      ) : (
        <Link
          href={`/clients/${id}/summary?edit=true`}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm sm:text-base"
        >
          <Edit2 size={16} />
          <span className="hidden sm:inline">Edit</span>
        </Link>
      )}
    </div>
  );
}
