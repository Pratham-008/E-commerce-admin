import multiparty from "multiparty";

export default async function POST(req) {
  const form = new multiparty.Form();

  const data = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

  return new Response(JSON.stringify({ message: "Success", data }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export const config = {
  api: { bodyParser: false },
};
