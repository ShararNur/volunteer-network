const HeroSection = () => {
  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-12 z-10 relative">
        <h1 className="mb-8 text-3xl font-bold leading-none text-black md:text-4xl lg:text-4xl uppercase ">
          I grow by helping people in need.
        </h1>

        <form className="w-full max-w-md mx-auto">
          <div className="join w-full justify-center">
            <div className="w-full max-w-[200px] sm:max-w-xs">
              <label
                className="input input-lg join-item rounded-s-md w-full"
                dir="ltr"
              >
                <input
                  type="search"
                  placeholder="Search..."
                  required
                  className="w-full"
                />
              </label>
            </div>
            <div dir="rtl" className="rounded-s-xl">
              <button className="btn btn-primary join-item btn-lg rounded-s-md rounded-e-none px-4 sm:px-8">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
