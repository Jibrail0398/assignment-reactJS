import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import Form from "./components/Form";
import Table from "./components/Table";

describe("App", () => {
    it("should render 2 others component (Form and Table)", async () => {
        const { container } = render(<App />);

        expect(container.querySelector("#form-student")).toBeInTheDocument();
        expect(container.querySelector("#table-student")).toBeInTheDocument();
    });
});

describe("Form", () => {
    it("should have Form with id form-student", async () => {
        const { container } = render(<Form />);

        expect(container.querySelector("#form-student")).toBeInTheDocument();
    });

    it("should have label Fullname and text input with id input-name", async () => {
        const { container } = render(<Form />);

        expect(screen.getByLabelText("Fullname")).toBeInTheDocument();
        expect(
            screen.getByRole("textbox", { name: "Fullname" })
        ).toBeInTheDocument();
        expect(container.querySelector("#input-name")).toBeInTheDocument();
    });

    it("should have label Birth Date and date input with id input-date", async () => {
        const { container } = render(<Form />);

        expect(screen.getByLabelText("Birth Date")).toBeInTheDocument();
        expect(container.querySelector("#input-date")).toBeInTheDocument();
    });

    it("should have label Gender, select with id input-gender and options as specified", async () => {
        const options = ["Male", "Female"];
        const { container } = render(<Form />);

        expect(screen.getByLabelText("Gender")).toBeInTheDocument();
        expect(
            screen.getByRole("combobox", { name: "Gender" })
        ).toBeInTheDocument();
        expect(container.querySelector("#input-gender")).toBeInTheDocument();
        options.forEach((op) => {
            return expect(
                screen.getByRole("option", { name: op })
            ).toBeInTheDocument();
        });
    });

    it("should have label Program Study, select with id input-prody and options as specified", async () => {
        const { container } = render(<Form />);

        expect(screen.getByLabelText("Program Study")).toBeInTheDocument();
        expect(
            screen.getByRole("combobox", { name: "Program Study" })
        ).toBeInTheDocument();
        expect(container.querySelector("#input-prody")).toBeInTheDocument();
        prodies.forEach((prody) => {
            return expect(
                screen.getByRole("option", { name: prody })
            ).toBeInTheDocument();
        });
    });

    it("should render buttons for 'Add Student'using the 'input' tag and type 'submit'", async () => {
        render(<Form />);
        let addButton = screen.getByRole("button", { name: "Add student" });
        expect(addButton).toBeInTheDocument();
        expect(addButton).toHaveValue("Add student");
    });
});

describe("Table", () => {
    it("should have Table with id table-student", async () => {
        const { container } = render(<Table />);

        expect(container.querySelector("#table-student")).toBeInTheDocument();
    });

    it("should have th with label as specified", async () => {
        render(<Table />);

        headers.forEach((h) => {
            return expect(
                screen.getByRole("columnheader", { name: h })
            ).toBeInTheDocument();
        });
    });

    describe("render all student data", () => {
        it("render all student fullname", async () => {
            render(<Table students={students} />);

            students.map((student) => {
                return expect(
                    screen.getByText(student.fullname)
                ).toBeInTheDocument();
            });
        });

        it("render all student birthDate", async () => {
            render(<Table students={students} />);

            students.map((student) => {
                return expect(
                    screen.getByText(student.birthDate)
                ).toBeInTheDocument();
            });
        });

        it("render all student gender", async () => {
            render(<Table students={students} />);

            students.map((student) => {
                return expect(
                    screen.getAllByText(student.gender)[0]
                ).toBeInTheDocument();
            });
        });

        it("render all student faculty", async () => {
            render(<Table students={students} />);

            students.map((student) => {
                return expect(
                    screen.getAllByText(student.faculty)[0]
                ).toBeInTheDocument();
            });
        });

        it("render all student programStudy", async () => {
            render(<Table students={students} />);

            students.map((student) => {
                return expect(
                    screen.getAllByText(student.programStudy)[0]
                ).toBeInTheDocument();
            });
        });
    });
});

const headers = [
    "No",
    "Full Name",
    "Birth Date",
    "Gender",
    "Faculty",
    "Program Study",
    "Option",
];

const prodies = [
    "Ekonomi",
    "Manajemen",
    "Akuntansi",
    "Administrasi Publik",
    "Administrasi Bisnis",
    "Hubungan Internasional",
    "Teknik Sipil",
    "Arsitektur",
    "Matematika",
    "Fisika",
    "Informatika",
];

const students = [
    {
        id: 1,
        fullname: "Djarot Purnomo",
        birthDate: "1993-10-28",
        gender: "Male",
        faculty: "Fakultas Ilmu Sosial dan Politik",
        programStudy: "Administrasi Bisnis",
    },
    {
        id: 2,
        fullname: "Rakanda Pangeran Nasution",
        birthDate: "1992-07-26",
        gender: "Male",
        faculty: "Fakultas Ilmu Sosial dan Politik",
        programStudy: "Administrasi Publik",
    },
    {
        id: 3,
        fullname: "Anshori Atmodiredjo",
        birthDate: "1996-11-01",
        gender: "Male",
        faculty: "Fakultas Teknologi Informasi dan Sains",
        programStudy: "Informatika",
    },
    {
        id: 4,
        fullname: "Angelia",
        birthDate: "1996-06-17",
        gender: "Female",
        faculty: "Fakultas Ilmu Sosial dan Politik",
        programStudy: "Administrasi Publik",
    },
    {
        id: 5,
        fullname: "Tuti Marsinah",
        birthDate: "1998-03-11",
        gender: "Female",
        faculty: "Fakultas Ekonomi",
        programStudy: "Ekonomi",
    },
    {
        id: 6,
        fullname: "Edizon",
        birthDate: "1982-01-31",
        gender: "Male",
        faculty: "Fakultas Ekonomi",
        programStudy: "Ekonomi",
    },
    {
        id: 7,
        fullname: "Vony Merdiana",
        birthDate: "1991-05-21",
        gender: "Female",
        faculty: "Fakultas Teknik",
        programStudy: "Teknik Sipil",
    },
    {
        id: 8,
        fullname: "Dea Christy Keliat",
        birthDate: "1994-02-27",
        gender: "Female",
        faculty: "Fakultas Ilmu Sosial dan Politik",
        programStudy: "Hubungan Internasional",
    },
    {
        id: 9,
        fullname: "Sekarini Mahyaswari",
        birthDate: "1996-02-01",
        gender: "Female",
        faculty: "Fakultas Ilmu Sosial dan Politik",
        programStudy: "Hubungan Internasional",
    },
    {
        id: 10,
        fullname: "Annisa Tahira",
        birthDate: "1996-09-01",
        gender: "Female",
        faculty: "Fakultas Teknologi Informasi dan Sains",
        programStudy: "Informatika",
    },
];
