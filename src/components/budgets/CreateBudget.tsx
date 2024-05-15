import { useEffect, useState } from "react";
import BudgetActions from "./actions/BudgetActions";
import ApiService from "../../service/ApiService";
import { toast } from "react-toastify";
import * as Yup from "yup";
import * as XLSX from "xlsx";
import { differenceInMonths } from "date-fns";

export default function CreateBudget({ projectId }) {
  const tableHedings = [
    "Name",
    "Country",
    "City",
    "Role",
    "Role Type",
    "Role Tier",
    "Start Date",
    "End Date",
    "Lookup Name",
    "Work Hours Per week",
    "Hourly Rate",
    "Weekly Rate",
    "Monthly Rate",
    "Yearly Rate",
    // "Cost",
    "Action",
  ];

  const initalValues = {
    name: "",
    country: "",
    city: "",
    role: "",
    roleType: "",
    roleTier: "",
    startDate: null,
    endDate: null,
    lookupName: "",
    workHoursPerWeek: "",
    hourlyRate: "",
    monthlyRate: 0,
    yearlyRate: 0,
    // cost: "",
  };

  const totalInitalCalculatedValues = {
    totalMontlyAmount: 0,
    totalYearlyAmount: 0,
    totalGOVOPerMonth: 0,
    totalGOVOPerYear: 0,
    finalMontlyRate: 0,
    finalYearlyRate: 0,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter employee Name"),
    country: Yup.string().required("Please select country"),

    city: Yup.string().required("Please select city"),
    role: Yup.string().required("Please select role"),

    roleType: Yup.string().required("Please select role type"),
    roleTier: Yup.string().required("Please select role tier"),

    startDate: Yup.date().required("Please enter  start date"),
    endDate: Yup.date()
      .required("Please enter end date")
      .min(Yup.ref("startDate"), "End date cannot be before start date"),
  });
  const validationArraySchema = Yup.array().of(validationSchema);

  const [budgetData, setBudgetData] = useState([initalValues]);
  const [totalCalcualtedValue, setTotalCalculatedValues] = useState(
    totalInitalCalculatedValues
  );
  const GOVO = 600;

  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [roleTypeList, setRoleTypeList] = useState([]);
  const [roleTierList, setRoleTierList] = useState([]);

  useEffect(() => {
    ApiService.fetchAllCountries().then((res) => {
      console.log(" Values ", res.data.listOfCountries);
      setCountryList(res.data.listOfCountries);
    });

    ApiService.fetchAllCities().then((res) => {
      setCityList(res.data.listOfCities);
    });

    ApiService.fetchAllRoles().then((res) => {
      setRoleList(res.data.listOfRoles);
    });

    ApiService.fetchAllRoleTypes().then((res) => {
      setRoleTypeList(res.data.listOfRoleTypes);
    });

    ApiService.fetchAllRoleTiers().then((res) => {
      setRoleTierList(res.data.listOfRoleTiers);
    });
  }, []);

  // type 1 - input box , type 2 - dropdown , type 3 - date
  const tableData = [
    {
      type: 1,
      name: "name",
      placeholder: "Name",
      disabled: false,
    },
    {
      type: 2,
      name: "country",
      placeholder: "Country",
      disabled: false,
    },
    {
      type: 2,
      name: "city",
      placeholder: "City",
      disabled: false,
    },
    {
      type: 2,
      name: "role",
      placeholder: "Role",
      disabled: false,
    },
    {
      type: 2,
      name: "roleType",
      placeholder: "RoleType",
      disabled: false,
    },
    {
      type: 2,
      name: "roleTier",
      placeholder: "RoleTier",
      disabled: false,
    },
    {
      type: 3,
      name: "startDate",
      placeholder: "Startdate",
      disabled: false,
    },
    {
      type: 3,
      name: "endDate",
      placeholder: "EndDate",
      disabled: false,
    },
    {
      type: 1,
      name: "lookupName",
      placeholder: "Lookupname",
      disabled: false,
    },
    {
      type: 1,
      name: "workHoursPerWeek",
      placeholder: "Work-hours-per-week",
      disabled: true,
    },
    {
      type: 1,
      name: "hourlyRate",
      placeholder: "Hourly-rate",
      disabled: true,
    },
    {
      type: 1,
      name: "weeklyRate",
      placeholder: "Weekly-rate",
      disabled: true,
    },
    {
      type: 1,
      name: "monthlyRate",
      placeholder: "Monthly-rate",
      disabled: true,
    },
    {
      type: 1,
      name: "yearlyRate",
      placeholder: "Yearly-rate",
      disabled: true,
    },
    // {
    //   type: 1,
    //   name: "cost",
    //   placeholder: "Cost",
    //   disabled: true,
    // },
    {
      type: 4,
    },
  ];

  const onInputChangeHandler = (event, index, columnName) => {
    const updatedValue = event.target.value;
    console.log(" UV", updatedValue);
    console.log(" previous data ", budgetData);
    const updatedData = [...budgetData];
    updatedData[index] = {
      ...updatedData[index],
      [columnName]: updatedValue,
    };

    if (columnName == "country") {
      console.log(" Inside country event ");
      const selectedCountry = event.target.value;
      console.log(" SC ", selectedCountry);
      const selectCityFromCountryList = countryList.find(
        (obj) => obj.name == selectedCountry
      );

      console.log(" selectCityFromCountryList ", selectCityFromCountryList);
      updatedData[index] = {
        ...updatedData[index],
        workHoursPerWeek: selectCityFromCountryList.workHoursPerWeek,
      };
    }

    console.log(" Update data ", updatedData);
    setBudgetData(updatedData);

    if (
      budgetData[index]["country"] != "" &&
      budgetData[index]["city"] != "" &&
      budgetData[index]["role"] != "" &&
      budgetData[index]["roleType"] != "" &&
      budgetData[index]["roleTier"] != ""
    ) {
      console.log(" Inside If !");
      console.log("country:", budgetData[index]["country"]);
      console.log("city:", budgetData[index]["city"]);
      console.log("role:", budgetData[index]["role"]);
      console.log("roleType:", budgetData[index]["roleType"]);
      console.log("roleTier:", budgetData[index]["roleTier"]);

      var lookupName =
        (budgetData[index]["country"] || "") +
        (budgetData[index]["city"] || "") +
        (budgetData[index]["role"] || "") +
        (budgetData[index]["roleType"] || "") +
        (budgetData[index]["roleTier"] || "");

      console.log("lookupName:", lookupName);
      ApiService.getBillingHours(lookupName).then((res) => {
        console.log(" Res ", res.data);
        const [weekCharges, yearlyCharges, montlyCharges] =
          calcualteMontlyAndYearlyRate(
            res.data.billingRatePerHour,
            budgetData[index]["workHoursPerWeek"]
          );
        updatedData[index] = {
          ...updatedData[index],
          hourlyRate: res.data.billingRatePerHour,
          weeklyRate: weekCharges,
          monthlyRate: montlyCharges,
          yearlyRate: yearlyCharges,
        };
        console.log(" UP data inside if ", updatedData);
        setBudgetData(updatedData);
        totalCalculation(updatedData);
      });
    }
  };

  const calcualteMontlyAndYearlyRate = (perHourCharges, hoursPerWeek) => {
    const weekCharges = perHourCharges * hoursPerWeek;
    const yearlyCharges = weekCharges * 48;
    const montlyCharges = yearlyCharges / 12;
    return [weekCharges, yearlyCharges, montlyCharges];
  };

  const totalCalculation = (updatedValue) => {
    console.log(" Trigged !");
    var totalMontlyAmount = 0;
    var totalYearlyAmount = 0;
    var differenceBetweenMonths = 0;
    updatedValue.forEach((val) => {
      console.log(" val ", val);
      differenceBetweenMonths = differnceBetweenDates(
        val.startDate,
        val.endDate
      );
      totalMontlyAmount += val.monthlyRate;
      totalYearlyAmount += val.yearlyRate;
    });
    var totalGOVOPerYear = differenceBetweenMonths * GOVO * updatedValue.length;

    var totalGOVOPerMonth = GOVO * updatedValue.length;

    var finalYearlyRate = totalGOVOPerYear + totalYearlyAmount;
    var finalMontlyRate = totalGOVOPerMonth + totalMontlyAmount;

    setTotalCalculatedValues({
      totalMontlyAmount,
      totalYearlyAmount,
      totalGOVOPerYear,
      totalGOVOPerMonth,
      finalYearlyRate,
      finalMontlyRate,
    });
  };

  const differnceBetweenDates = (startDate, endDate) => {
    return differenceInMonths(endDate, startDate);
  };
  const updateBillingHours = () => {};

  const copyHandler = (id) => {
    const selectedData = budgetData[id];
    const copiedData = { ...selectedData };

    const currentBudgetDate = [...budgetData];
    currentBudgetDate.push(copiedData);
    setBudgetData(currentBudgetDate);
    console.log(" BD ", currentBudgetDate);
    totalCalculation(currentBudgetDate);
  };

  const deleteHandler = (id) => {
    if (budgetData.length > 1) {
      const currentBudgetDate = [...budgetData];
      currentBudgetDate.splice(id, 1);
      setBudgetData(currentBudgetDate);
      ``;
      totalCalculation(currentBudgetDate);
    } else {
      toast.error(" Minimum Budget list should be 1");
    }
  };

  const whenCreateBudgetButtonClicked = () => {
    validationArraySchema
      .validate(budgetData, { abortEarly: false })
      .then(() => {
        saveBudgetDetails(budgetData);
      })
      .catch((err) => {
        for (const error of err.errors) {
          toast.error(error);
          return;
        }
      });
  };

  const saveBudgetDetails = (budgetData) => {
    const budgtDetails = {
      projectId: projectId,
      budget: budgetData,
      costDetails: totalCalcualtedValue,
    };

    console.log(" budget details ", budgtDetails);

    ApiService.saveBudgetDetails(budgtDetails)
      .then((res) => {
        toast.success(" Budget Created Sucessfully");
      })
      .catch((err) => {
        toast.error(" Sorry something went wrong");
      });
  };

  const renderTableBody = () => (
    <tbody>
      {budgetData.map((rowData, rowIndex) => (
        <tr key={rowIndex}>
          {tableData.map((columnData, colIndex) => (
            <td key={colIndex} style={{ maxWidth: "11rem", minWidth: "11rem" }}>
              {renderDynamicInput(columnData, rowIndex)}
            </td>
          ))}
        </tr>
      ))}

      <tr className="mt-1 text-xs font-semibold text-gray-700 justify-end">
        <td style={{ border: "none" }} colSpan={11}></td>
        <td
          style={{
            maxWidth: "11rem",
            minWidth: "11rem",
            justifyItems: "right",
            border: "none",
          }}
          className="font-semibold text-gray-700 text-right"
        >
          Total
        </td>
        <td
          style={{
            maxWidth: "11rem",
            minWidth: "11rem",
            justifyItems: "right",
            border: "none",
          }}
          className="font-semibold text-gray-700 text-right"
        >
          {formatCurrency(totalCalcualtedValue.totalMontlyAmount)}
        </td>
        <td
          style={{
            maxWidth: "11rem",
            minWidth: "11rem",
            justifyItems: "right",
            border: "none",
          }}
          className="font-semibold text-gray-700 text-right"
        >
          {formatCurrency(totalCalcualtedValue.totalYearlyAmount)}
        </td>
      </tr>
      <tr>
        <td style={{ border: "none" }} colSpan={12}></td>
        <td
          style={{
            maxWidth: "11rem",
            minWidth: "11rem",
            justifyItems: "right",
            border: "none",
          }}
          className="font-semibold text-gray-700 text-right"
        >
          GOVO
        </td>
        <td
          style={{
            maxWidth: "11rem",
            minWidth: "11rem",
            justifyItems: "right",
            border: "none",
          }}
          className="font-semibold text-gray-700 text-right"
        >
          {formatCurrency(totalCalcualtedValue.totalGOVOPerYear)}
        </td>
      </tr>
      <tr>
        <td style={{ border: "none" }} colSpan={12}></td>
        <td
          style={{
            maxWidth: "11rem",
            minWidth: "11rem",
            justifyItems: "right",
            border: "none",
          }}
          className="font-semibold text-gray-700 text-right"
        >
          Total Incl. GOVO
        </td>
        <td
          style={{
            maxWidth: "11rem",
            minWidth: "11rem",
            justifyItems: "right",
            border: "none",
          }}
          className="font-semibold text-gray-700 text-right"
        >
          {formatCurrency(totalCalcualtedValue.finalYearlyRate)}
        </td>
      </tr>
    </tbody>
  );

  const renderDynamicInput = (columnData, index) => {
    if (columnData.type == 1) {
      return (
        <input
          type="text"
          name={columnData.name}
          value={
            columnData
              ? formatCurrency(budgetData[index][columnData.name])
              : budgetData[index][columnData.name]
          }
          className="input-box w-full"
          style={{ textAlign: columnData ? "left" : "right" }}
          onChange={(event) =>
            onInputChangeHandler(event, index, columnData.name)
          }
          placeholder={columnData.placeholder}
          disabled={columnData.disabled}
        />
      );
    } else if (columnData.type == 2) {
      const valueList =
        columnData.name === "country"
          ? countryList
          : columnData.name === "city"
          ? cityList
          : columnData.name === "role"
          ? roleList
          : columnData.name === "roleType"
          ? roleTypeList
          : roleTierList;

      return (
        <select
          className="input-box w-full"
          name={columnData.name}
          value={budgetData[index][columnData.name]}
          onChange={(event) =>
            onInputChangeHandler(event, index, columnData.name)
          }
        >
          <option value="">--Select--</option>
          {valueList.map((value) => {
            return <option key={value.id}>{value.name}</option>;
          })}
        </select>
      );
    } else if (columnData.type == 3) {
      return (
        <input
          name={columnData.name}
          value={budgetData[index][columnData.name]}
          onChange={(event) =>
            onInputChangeHandler(event, index, columnData.name)
          }
          type="date"
          className="input-box w-full"
        />
      );
    } else {
      return (
        <div>
          <button
            id={index}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg text-xs mr-2"
            onClick={() => copyHandler(index)}
          >
            {" "}
            Copy{" "}
          </button>
          <button
            id={index}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-xs"
            onClick={() => deleteHandler(index)}
          >
            {" "}
            Delete{" "}
          </button>
        </div>
      );
    }
  };

  const whenAddNewButtonClicked = () => {
    const previousBudgetData = [...budgetData];
    previousBudgetData.push(initalValues);
    setBudgetData(previousBudgetData);
  };

  const whenExportPDFClicked = () => {
    console.log(" export pdf button cliked!");
  };

  const whenExporXLSXClicked = () => {
    if (budgetData.length != 0) {
      const ws = XLSX.utils.json_to_sheet(budgetData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Budget");
      XLSX.writeFile(wb, `${"Budget-report-" + new Date()}.xlsx`);
    } else {
      toast.error(" Nothing to export!");
    }
  };

  const formatCurrency = (inputValue) => {
    if (inputValue != "" && inputValue != undefined) {
      return inputValue.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg mt-2">
      <h2 className="text-lg font-semibold mb-4 text-gray-500">
        Create Budget
      </h2>

      <div
        className="m-4 mr-0 p-2"
        style={{
          background: "linear-gradient(to right, white, rgba(240, 240, 240))",
        }}
      >
        <BudgetActions
          addNewButtonHandler={whenAddNewButtonClicked}
          addExportPDFHandler={whenExportPDFClicked}
          addExportExcelHandler={whenExporXLSXClicked}
        />
      </div>

      <div className="overflow-y-auto overflow-x-auto pd-10">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
          <thead className="bg-gray-200">
            <tr className="whitespace-nowrap">
              {tableHedings.map((heading, index) => (
                <th
                  key={index}
                  style={{ maxWidth: "11rem", minWidth: "11rem" }}
                  className="px-6 py-3 border border-gray-300 text-xs font-semibold text-gray-700 w-56"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          {renderTableBody()}
        </table>
      </div>

      <div className="flex justify-center  mt-10">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-semibold"
          onClick={whenCreateBudgetButtonClicked}
        >
          {" "}
          Create Budget{" "}
        </button>
      </div>
    </div>
  );
}
