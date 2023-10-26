interface Params {
    reviewId: string;
  }
  
  export interface ReviewParams {
    params: Params;
  }
  
  export default function Review({ params }: ReviewParams) {
    return (
      <main className="flex min-h-screen flex-col items-center p-10">
        <h1 className="text-3xl font-bold p-10">Review: {params.reviewId}</h1>
      </main>
    );
  }