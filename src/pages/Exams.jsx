import { Link } from "react-router-dom";
import { Calendar, Clock, Users, FileText } from "lucide-react";
import { exams } from "../data/mockData";

const Exams = () => (
  <div className="min-h-screen bg-gray-50 py-8 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark mb-2">प्रवेश परीक्षाएं</h1>
          <p className="text-gray-600">भारत की प्रमुख प्रवेश परीक्षाओं की तारीख और विवरण</p>
        </div>
        <Link to="/" className="text-primary font-medium hover:underline">
          होमपेज पर जाएं →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {exams.map((exam) => (
          <div key={exam.id} className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                {exam.level}
              </span>
            </div>
            <h3 className="text-lg font-bold text-dark mb-2">{exam.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{exam.fullName}</p>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>परीक्षा: {exam.examDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span>आवेदन शुरू: {exam.applyStart}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <span>आवेदन अंतिम: {exam.applyEnd}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">एजेंसी:</span>
                <span className="font-medium">{exam.conductingBody}</span>
              </div>
            </div>
            <Link
              to="/"
              className="mt-6 block text-center text-primary font-medium hover:underline text-sm"
            >
              विस्तार से देखें →
            </Link>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Exams;
