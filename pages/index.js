import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Next Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active Next Meetups."
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   // this function gets executed on the server and always runs on the server after deployment, it regenerates the page if required for every incoming request so there is no need of any revalidate value to be set up.It is guaranteed to run for every request.
//   const req = context.req;
//   const res = context.res;
//   // your entire server side code like fetching data from an API,etc.
//   return {
//     props: {
//       meetups: DUMMY_MEETS,
//     },
//   };
// }

export async function getStaticProps() {
  // perform any server side functions.
  const client = await MongoClient.connect(process.env.MONGO_URL);
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          address: meetup.address,
          id: meetup._id.toString(),
          image: meetup.image,
        };
      }),
    },
    revalidate: 1,
  };
}
export default HomePage;
