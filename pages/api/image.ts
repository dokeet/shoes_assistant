import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
});

export default async function handler(req, res) {
  //   if (!process.env.REPLICATE_API_TOKEN) {
  //     throw new Error(
  //       "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it."
  //     );
  //   }

  //   const prediction = await replicate.predictions.create({
  //     // Pinned to a specific version of Stable Diffusion
  //     // See https://replicate.com/stability-ai/stable-diffusion/versions
  //     version: "db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",

  //     // This is the text prompt that will be submitted by a form on the frontend
  //     input: { prompt: req.body.prompt },
  //   });

  const output = await replicate.run(
    "logerzhu/ad-inpaint:7153aacd47daea504224c6223b45f4293acb05a6d860c3d7e968af3d833f1548",
    {
      input: {
        image_path: req.body.image_path,
        prompt: req.body.prompt,
        regen_prompt: true,
      },
    }
  );
  console.log(output);
  if (output?.error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: output.error }));
    return;
  }

  res.statusCode = 201;
  res.end(JSON.stringify(output));
}
