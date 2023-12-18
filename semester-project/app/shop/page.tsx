"use client";
import { useState, useEffect } from "react";

const space_id = "t4hj2gedy0mq";
const access_token = "EUJX-F3b-rBsOurVaY_YB4M4uxzTo9eBRM6Fuooret0";

const query = `
query Shop{
  electronicsPartsCollection{
    items{
      sys{
        id
      }
      image{
        url
      }
      description,
      price,
      model,
    }
  }
  gamingDevicesCollection{
    items{
      sys{id
      }
      image{
        url
      }
      description,
      price,
      model,
    }
  }
  smartphonesCollection{
    items{
      sys{id
      }
      image{url
      }
      description,
      price,
      model,
    }
  }
}
`;

export default function Page() {
  const [smartphones, setSmartphones] = useState<any>([]);
  const [gamingDevices, setGamingDevices] = useState<any>([]);
  const [electronics, setElectronics] = useState<any>([]);

  async function fetchGraphQL(query: string) {
    return fetch(
      `https://graphql.contentful.com/content/v1/spaces/${space_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({ query }),
      }
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchGraphQL(query);
        const data = await response.json();
        console.log(data);
        setSmartphones(data.data.smartphonesCollection.items);
        setGamingDevices(data.data.gamingDevicesCollection.items);
        setElectronics(data.data.electronicsPartsCollection.items);
        return data;
      } catch (error) {
        console.error("Error fetching Contentful data:", error);
        return null;
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-black">
      <div>
        <h1>Smartphones</h1>
        <div className="grid grid-cols-3 gap-4">
          {smartphones.map((item: any) => {
            return (
              <div key={item.sys.id}>
                <img src={item.image.url} alt="" />
                <div>{item.description}</div>
                <div>{item.price}</div>
                <div>{item.model}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h1>Gaming Devices</h1>
        <div className="grid grid-cols-3 gap-4">
          {gamingDevices.map((item: any) => {
            return (
              <div key={item.sys.id}>
                <img src={item.image.url} alt="" />
                <div>{item.description}</div>
                <div>{item.price}</div>
                <div>{item.model}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h1>Electronics</h1>
        <div className="grid grid-cols-3 gap-4">
          {electronics.map((item: any) => {
            return (
              <div key={item.sys.id}>
                <img src={item.image.url} alt="" />
                <div>{item.description}</div>
                <div>{item.price}</div>
                <div>{item.model}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}