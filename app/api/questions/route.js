import questions from '@/public/questions';


export const GET = (req) => {
    return new Response(JSON.stringify(questions), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };