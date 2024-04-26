import Link from "next/link";
import { getCoverImage, getGames, getDescription } from "./services/videogames";
import { Pagination } from "./components/Pagination";
import { mdToHTML } from "./snarkdown";

export default async function Home({ searchParams }) {
  const { page } = searchParams;
  console.log(searchParams);
  const { data: games, pagination }  = await getGames({ page: +page});
  console.log(games);
  return (
    <main className="flex flex-col items-center h-screen p-24">
      {
        games.map(({attributes, id}) => (
          
          <Link key={id} href="#" className="flex flex-col min-w-[600px] min-h-[300px] items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <img className="bg-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={getCoverImage({ attributes })} alt="foto" />
              <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{attributes.title}</h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"
                  /*dangerouslySetInnerHTML={{ __html: mdToHTML(getDescription({ attributes })) }}*/ >
                    {getDescription({ attributes })}
                  </p>
              </div>
          </Link>

        ))
      }
      <Pagination pagination={pagination} />
    </main>
  );
}