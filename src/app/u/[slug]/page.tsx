export default async function FormRegis({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  return (
      <iframe
        src={`https://sandbox.kurniasafety.com/u/${slug}`}
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          border: 0,
          margin: 0,
          padding: 0,
        }}
      />
  );
}
