interface ErrorWithResponse extends Error {
  response: Response;
  data: any;
}

export default async (args:
{ url: string, method?: string, token?: string, body?: string }) => {
  try {
    const response = await fetch(`${process.env.API_URL}/${args.url}`, {
      method: args.method,
      headers: args.token ? {
        Authorization: `Bearer ${args.token}`,
      } : undefined,
      body: args.body,
    });

    const data = response.json();

    if (response.ok) {
      return data;
    }

    const error = new Error(response.statusText) as ErrorWithResponse;
    error.response = response;
    error.data = data;

    throw error;
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
  }
};
