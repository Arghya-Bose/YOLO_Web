@@ .. @@
 const CourseCard: React.FC<{ 
   course: typeof courses[0];
-  user: any;
-  isEnrolled: boolean;
-  onEnroll: () => Promise<boolean>;
-  enrollmentLoading: boolean;
-}> = ({ course, user, isEnrolled, onEnroll, enrollmentLoading }) => {
+}> = ({ course }) => {
+  const { user } = useAuth();
+  const { isEnrolled, enrollInCourse, loading: enrollmentLoading } = useEnrollments();
   const [enrolling, setEnrolling] = useState(false);
 
   const handleEnroll = async () => {
@@ .. @@
     }
 
     setEnrolling(true);
-    const success = await onEnroll();
+    const success = await enrollInCourse(course.id);
     if (success) {
       // Show success message or update UI
     }
@@ .. @@
         ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {filteredCourses.map(course => (
-              <CourseCard 
-                key={course.id} 
-                course={course} 
-                user={user}
-                isEnrolled={isEnrolled(course.id)}
-                onEnroll={() => enrollInCourse(course.id)}
-                enrollmentLoading={enrollmentLoading}
-              />
+              <CourseCard key={course.id} course={course} />
             ))}
           </div>
         )}
@@ .. @@
           <button 
             onClick={handleEnroll}
             disabled={enrolling || enrollmentLoading}
             className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 transform hover:scale-[1.02] ${
-              isEnrolled 
+              isEnrolled(course.id)
                 ? 'bg-green-600 text-white hover:bg-green-700' 
                 : 'bg-blue-600 text-white hover:bg-blue-700'
             } disabled:opacity-50 disabled:cursor-not-allowed`}
@@ .. @@
               <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
               Enrolling...
             </div>
-          ) : isEnrolled ? (
+          ) : isEnrolled(course.id) ? (
             'Enrolled ✓'
           ) : (
             'Enroll Now'