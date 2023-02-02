import { Workbook } from "exceljs";
import { useRef, useState } from "react";
import { formatDate, validateInputs } from "./helper";
import CategorySelector from "./components/CategorySelector";

function App() {
  const [error, setError] = useState("");
  const [headers, setHeaders] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [accompanimentHeader, setAccompanimentHeader] = useState<any>();
  const [dietaryHeader, setDietaryHeader] = useState<any>();

  const fileRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);

  const resetError = () => {
    setTimeout(() => {
      setError("");
    }, 2000);
  };

  const scanFile = () => {
    const files = fileRef.current?.files;
    if (!files) {
      setError("Please select file");
      resetError();
      return;
    }
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = new Workbook();
      workbook.xlsx.load(data).then((book) => {
        const worksheet = workbook.worksheets[0];
        setHeaders(worksheet.getRow(1).values as unknown[]);
      });
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async () => {
    const files = fileRef.current?.files;
    const date = dateRef.current?.value;
    const validity = validateInputs(files, date);
    if (!validity.isValid) {
      setError(validity?.errorMessage);
      resetError();
      return;
    }
    if (!date || !files) {
      return;
    }
    const formattedDate = formatDate(date);
    uploadFile(files, formattedDate);
  };
  console.log(headers);
  return (
    <div className="h-screen w-screen">
      <h1 className="mx-auto w-fit py-4 text-2xl font-bold text-primary">
        Food Order Categoriser
      </h1>
      <div className=" mx-auto w-fit">
        <h2 className="mx-auto my-2 w-fit">
          Input your food order excel sheet and I'll parse it out
        </h2>

        {error && (
          <div className="alert alert-error h-12">
            <div className="mx-auto w-fit font-semibold text-error-content">
              {error}
            </div>
          </div>
        )}
        <div className="mx-auto w-fit">
          <div className="form-control">
            <div className="my-1">
              <label className="label">
                <span className="label-text text-primary-content">
                  Pick a date
                </span>
              </label>
              <input
                type="date"
                ref={dateRef}
                className="input-primary input w-full"
              />
            </div>
            <div className="my-1">
              <label className="label">
                <span className="label-text text-primary-content">
                  Pick a file
                </span>
              </label>
              <input
                type="file"
                ref={fileRef}
                className="file-input-primary file-input w-full max-w-xs"
              />
              <div
                className="btn-outline btn-primary btn ml-4"
                onClick={scanFile}
              >
                Scan
              </div>
            </div>
            <CategorySelector
              headers={headers}
              categories={categories}
              accompanimentHeader={accompanimentHeader}
              dietaryHeader={dietaryHeader}
              setHeaders={setHeaders}
              setCategories={setCategories}
              setAccompanimentHeader={setAccompanimentHeader}
              setDietaryHeader={setDietaryHeader}
            />
            <div className="my-2 mx-auto">
              <button
                className="btn-primary btn mx-auto w-fit"
                onClick={handleSubmit}
              >
                Parse File
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
function uploadFile(files: FileList, formattedDate: string) {
  throw new Error("Function not implemented.");
}
