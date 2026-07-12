import { notFound } from "next/navigation";
import { getSectionSchema } from "@/lib/sectionSchemas";
import SectionForm from "@/components/admin/SectionForm";

export default async function SectionEditorPage({ params }) {
  const { slug } = await params;
  const schema = getSectionSchema(slug);

  if (!schema) {
    notFound();
  }

  // Placeholder initial data — will be fetched from the backend API later.
  const initialData = {};

  return (
    <div className="flex flex-col gap-1">
      <p className="mb-4 text-[.85rem] text-muted">
        Editing content for <strong className="text-navy">{schema.label}</strong> — changes here update the live &quot;{slug}&quot; section on your site.
      </p>
      <SectionForm schema={schema} initialData={initialData} />
    </div>
  );
}