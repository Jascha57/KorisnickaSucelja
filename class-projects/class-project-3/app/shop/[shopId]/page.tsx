interface Params {
    shopId: string;
  }
  
  export interface ShopParams {
    params: Params;
  }
  
  export default function ShopFunc({ params }: ShopParams) {
    return (
      <main className="flex min-h-screen flex-col items-center p-10">
        <h1 className="text-3xl font-bold p-10">Shop: {params.shopId}</h1>
      </main>
    );
  }