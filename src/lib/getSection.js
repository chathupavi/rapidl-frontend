export async function getSection(slug){

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/sections/${slug}`,
        {
            cache:"no-store"
        }
    );


    if(!response.ok){
        return {};
    }


    const result = await response.json();


    return result.data || {};

}