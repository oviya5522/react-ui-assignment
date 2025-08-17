
import DataTable from "../components/DataTable";
import type { DataTableProps, Column } from "../components/DataTable";
import type { Meta } from "@storybook/react";

interface User extends Record<string, unknown> {
  id: number;
  name: string;
  age: number;
  email: string;
}


const meta: Meta<typeof DataTable> = {
  title: "Assignment/DataTable",
  component: DataTable,
};

export default meta;


const sampleData: User[] = [
  { id: 1, name: "Alice", age: 25, email: "alice@example.com" },
  { id: 2, name: "Bob", age: 30, email: "bob@example.com" },
  { id: 3, name: "Charlie", age: 28, email: "charlie@example.com" },
];


const columns: Column<User>[] = [
  { key: "id", title: "ID", dataIndex: "id", sortable: true },
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
];


const TableWrapper = (args: DataTableProps<User>) => <DataTable<User> {...args} />;

export const Default = {
  render: (args: DataTableProps<User>) => <TableWrapper {...args} />,
  args: {
    data: sampleData,
    columns: columns,
    rowKey: "id",
  },
};

export const Empty = {
  render: (args: DataTableProps<User>) => <TableWrapper {...args} />,
  args: {
    data: [],
    columns: columns,
    rowKey: "id",
  },
};

export const SelectableRows = {
  render: (args: DataTableProps<User>) => <TableWrapper {...args} />,
  args: {
    data: sampleData,
    columns: columns,
    selectable: true,
    rowKey: "id",
    onRowSelect: (selectedRows: User[]) =>
      console.log("Selected rows:", selectedRows),
  },
};

export const LoadingState = {
  render: (args: DataTableProps<User>) => <TableWrapper {...args} />,
  args: {
    data: sampleData,
    columns: columns,
    loading: true,
    rowKey: "id",
  },
};
