export default async function FormRegistrasBk3n({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src="https://sandbox.kurniasafety.com/u/form-registrasi-bk3n"
        style={{ width: "100%", height: "100%", border: "none" }}
        allowFullScreen
      />
    </div>
  );
}
