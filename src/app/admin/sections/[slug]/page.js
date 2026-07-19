import { notFound } from "next/navigation";
import { getSectionSchema } from "@/lib/sectionSchemas";
import SectionForm from "@/components/admin/SectionForm";


async function getSectionData(slug) {

  try {

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/sections/${slug}`,
      {
        cache: "no-store",
      }
    );


    if (!response.ok) {

      console.error(
        "Failed loading section:",
        response.status
      );

      return {};

    }



    const result = await response.json();



    // Return only actual section content
    return result.data || {};



  } catch(error) {


    console.error(
      "Section fetch error:",
      error
    );


    return {};

  }

}



export default async function SectionEditorPage({ params }) {


  const { slug } = await params;


  const schema = getSectionSchema(slug);



  if (!schema) {

    notFound();

  }



  // Fetch existing database content
  const initialData = await getSectionData(slug);



  return (

    <div className="flex flex-col gap-1">


      <p className="mb-4 text-[.85rem] text-muted">

        Editing content for{" "}

        <strong className="text-navy">

          {schema.label}

        </strong>{" "}

        — changes here update the live &quot;{slug}&quot; section on your site.

      </p>



      <SectionForm

        schema={schema}

        initialData={initialData}

      />


    </div>

  );

}