export default async function FundraisingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div>
      <h1>Fundraising {id}</h1>
      <p>Donate to our cause</p>
    </div>
  );
}
