import { useState, useMemo } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  rowKey: keyof T; 
}

function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  rowKey,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: "asc" | "desc" } | null>(null);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal === bVal) return 0;
      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;
      return sortConfig.direction === "asc" ? (aVal > bVal ? 1 : -1) : aVal > bVal ? -1 : 1;
    });
  }, [data, sortConfig]);

  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;
    setSortConfig(prev => prev?.key === column.dataIndex
      ? { key: column.dataIndex, direction: prev.direction === "asc" ? "desc" : "asc" }
      : { key: column.dataIndex, direction: "asc" });
  };

  const handleRowSelect = (row: T) => {
    if (!selectable) return;
    const rowValue = row[rowKey];
    const isSelected = selectedRows.some(r => r[rowKey] === rowValue);

    const newSelection = isSelected
      ? selectedRows.filter(r => r[rowKey] !== rowValue)
      : [...selectedRows, row];

    setSelectedRows(newSelection);
    onRowSelect?.(newSelection);
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border border-gray-300 dark:border-gray-500">
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <tr>
            {selectable && <th className="p-2 border-b"></th>}
            {columns.map(col => (
              <th
                key={col.key}
                className="p-2 text-left cursor-pointer select-none border-b dark:border-gray-600"
                onClick={() => handleSort(col)}
                aria-sort={
                  sortConfig?.key === col.dataIndex
                    ? sortConfig.direction === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
              >
                <div className="flex items-center">
                  {col.title}
                  {col.sortable && (
                    <span className="ml-1">
                      {sortConfig?.key === col.dataIndex
                        ? sortConfig.direction === "asc" ? "▲" : "▼"
                        : "↕"}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="p-4 text-center text-gray-500">
                Loading...
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="p-4 text-center text-gray-400">
                No data available
              </td>
            </tr>
          ) : (
            sortedData.map((row, idx) => (
              <tr
                key={idx}
                className={`hover:bg-gray-100 dark:hover:bg-gray-700 ${selectedRows.some(r => r[rowKey] === row[rowKey]) ? "bg-green-100 dark:bg-green-800" : "bg-white dark:bg-gray-800"} text-gray-900 dark:text-gray-100`}
              >
                {selectable && (
                  <td className="p-2 border-b text-center">
                    <input
                      type="checkbox"
                      className="accent-green-500 w-4 h-4"
                      checked={selectedRows.some(r => r[rowKey] === row[rowKey])}
                      onChange={() => handleRowSelect(row)}
                      aria-checked={selectedRows.some(r => r[rowKey] === row[rowKey])}
                      role="checkbox"
                    />
                  </td>
                )}
                {columns.map(col => (
                  <td key={col.key} className="p-2 border-b">
                    {String(row[col.dataIndex] ?? "-")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
