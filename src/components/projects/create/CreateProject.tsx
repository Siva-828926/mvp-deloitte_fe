import "./CreateProject.css";
import { Formik, Form, Field, useFormik, FormikValues } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import ApiService from "../../../service/ApiService";

const CreateProject = ( { isProjectCreated }) => {
  const intialFormValues = {
    projectName: "",
    gvmName: "",
    gvmEmail: "",
    gvmBudget: "",
    projectStartDate: null,
    projectEndDate: null,
  };

  const validationSchema = Yup.object().shape({
    projectName: Yup.string().required("Please enter Project Name"),
    gvmName: Yup.string().required("Please enter GVM Name"),
    gvmEmail: Yup.string()
      .email("Invalid email")
      .required("Please enter GVM Email"),
    gvmBudget: Yup.number().required("Please enter GVM Budget"),
    projectStartDate: Yup.date().required("Please enter Project start date"),
    projectEndDate: Yup.date()
      .required("Please enter Project end date")
      .min(Yup.ref("projectStartDate"), "End date cannot be before start date"),
  });

  const handleProjectSubmit = async (
    values: FormikValues,
    { setSubmitting }
  ) => {
    console.log(" Inside click!");
    try {
      await validationSchema.validate(values, { abortEarly: false });
      setSubmitting(true);
      console.log(" All done ", values);
      saveProjectDetails(values);
    } catch (error) {
      // console.log(" error " , error)
      for (const err of error.inner) {
        toast.error(err.message);
        return;
      }
    } finally {
      // Ensure isSubmitting remains true after validation
      setSubmitting(true);
    }
  };

  const saveProjectDetails = (details: any) => {
    console.log(" Svae method called");
    // const userId = useSelector((state : RootState)=>state.user.userId)
    console.log(" values ", details);
    // console.log( " user ud" , userId)
    const projectDetails = {
      userId: 1,
      ...details,
    };
    console.log(" Project details ", projectDetails);
    ApiService.saveProjectDetails(projectDetails)
      .then((res) => {
        if (res.serviceStatus) {
          toast.success(" Project created successfully ");
          isProjectCreated(res.data.projectId)
        } else {
          toast.error(res.serviceMessage);
        }
      })
      .catch((err) => toast.error("Something went wrong"));
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-500">Create Project</h2>

      <Formik initialValues={intialFormValues} onSubmit={handleProjectSubmit}>
        {({ isSubmitting }) => {
          return (
            <Form className="flex space-x-4">
              <Field
                type="text"
                name="projectName"
                placeholder="Project Name"
                className="input-box"
                disabled={isSubmitting}
              />
              <Field
                type="text"
                name="gvmName"
                placeholder="GVM Name"
                className="input-box"
              />
              <Field
                type="email"
                name="gvmEmail"
                placeholder="GVM Email"
                className="input-box"
              />
              <Field
                type="number"
                name="gvmBudget"
                placeholder="GVM Budget"
                className="input-box"
              />
              <Field
                type="date"
                name="projectStartDate"
                placeholder="Start Date"
                className="input-box"
              />
              <Field
                type="date"
                name="projectEndDate"
                placeholder="End Date"
                className="input-box"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-semibold"
                style={{ minWidth : "8rem"}}
              >
                Create Project
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateProject;
