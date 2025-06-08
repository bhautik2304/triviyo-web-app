import Cabs from "@/section/cabs/CabsList";

export const metadata = {
  title: "trivyo - Reliable Cab and Hotel Booking Services",
  description:
    "Welcome to trivyo, your trusted partner for hassle-free cab and hotel bookings. With our extensive network of reliable drivers and accommodation providers, we ensure seamless travel experiences for every journey. Whether you need a comfortable ride to your destination or a cozy stay at your favorite hotel, trivyo has got you covered. Book your next trip with us and enjoy convenience, safety, and affordability.",
};

function CabsList() {
  return (
    <>
      <section>
        <Cabs />
      </section>
    </>
  );
}

export default CabsList;
