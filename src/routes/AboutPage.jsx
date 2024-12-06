const AboutPage = () => {
  return (
    <div className="min-h-screen dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col items-center justify-center py-12 px-6 mt-4">
      <div className="max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-redditOrange">
          About Munaciella News
        </h1>
        <p className="text-lg leading-relaxed mb-4">
          Welcome to <strong>Munaciella News</strong>, your go-to platform for the latest
          updates, insightful articles, and trending stories across a variety of topics. 
          Whether you're catching up on world news or diving into niche topics, 
          Munaciella News aims to deliver reliable, engaging, and well-curated content.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Built with a passion for knowledge sharing, Munaciella News was 
          designed to emulate the familiar feel of popular platforms while 
          bringing a unique and accessible experience to our users. 
        </p>
        <p className="text-lg leading-relaxed mb-4">
          This project is a work-in-progress and continuously evolving to 
          incorporate new features, improve functionality, and ensure the best user experience. 
          We appreciate your support and feedback as we grow!
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Thank you for being a part of Munaciella News. If you have any 
          suggestions or feedback, please feel free to reach out!
        </p>
        <div className="text-center mt-6">
          <p className="text-gray-600 dark:text-gray-400 italic">
            “Stay informed, stay inspired.”
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;