import { useTheme } from '../context/ThemeContext';

export default function MinistryPrograms() {
  const { dark } = useTheme();

  const programs = [
    {
      title: 'School of Ministry',
      image: '/School.jpg',
      desc: 'Equipping believers for deeper spiritual growth and service.',
    },
    {
      title: 'Discipleship Class',
      image: '/Discipleship.jpg',
      desc: 'Building strong foundations in Christ.',
    },
    {
      title: 'Bible Class',
      image: 'bible.jpg',
      desc: 'Understanding the Word with clarity and revelation.',
    },
    {
      title: 'Leadership Class',
      image: '/Leadership.jfif',
      desc: 'Raising leaders for kingdom impact.',
    },
    {
      title: 'Teenagers Discipleship',
      image: '/Teenagers.jfif',
      desc: 'Guiding the next generation in truth.',
    },
    {
      title: 'Teenagers Bible Class',
      image: '/Teenagers2.jfif',
      desc: 'Helping teens grow in God’s Word.',
    },
    {
      title: 'Clarion Call',
      image: '/Clarion.png',
      desc: 'A movement calling hearts back to God.',
    },
    {
      title: 'University Chapters',
      image: '/University.jpg',
      desc: 'Start a chapter in your campus and impact lives.',
    },
  ];

  return (
    <section className={`py-20 ${dark ? 'bg-gray-950' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Header */}
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
          Grow With Us
        </h2>

        <p className={`text-lg max-w-2xl mx-auto mb-12 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
          Explore our training programs, discipleship pathways, and outreach movements designed to build lives and raise leaders.
        </p>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {programs.map((program, index) => (
            <div
              key={index}
              className={`group rounded-2xl overflow-hidden shadow-lg cursor-pointer ${
                dark ? 'bg-gray-900' : 'bg-gray-50'
              }`}
            >
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-4 text-left">
                <h3 className="text-lg font-semibold mb-2">
                  {program.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {program.desc}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}