import {useState} from "react";

const CreateQuizPage = () => {
    const [title, setTitle] = useState('');

    return (
        <div>
            <h1>Create quiz page</h1>
            <div>
                <div className="input-group mb-3 p-5">
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Назва вікторини..."
                    />
                </div>
                <div>
                    
                </div>
                <button>
                    Додати питання
                </button>
            </div>
        </div>
    );
};

export default CreateQuizPage;