import quizzes from '@/public/quizzes';

export const GET = (req) => {
    return new Response(JSON.stringify(quizzes), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };