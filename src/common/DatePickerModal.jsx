import React, { useState, useMemo } from "react";
import dayjs from "dayjs";

const DatePickerModal = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const selected = value ? dayjs(value) : dayjs();

  const [viewYear, setViewYear] = useState(selected.year());
  const [viewMonth, setViewMonth] = useState(selected.month());

  const currentYear = dayjs().year();

  // Build year list (100 years)
  const years = useMemo(() => {
    let list = [];
    for (let y = currentYear; y >= 1920; y--) list.push(y);
    return list;
  }, [currentYear]);

  // Build calendar days
  const firstDay = dayjs()
    .year(viewYear)
    .month(viewMonth)
    .startOf("month")
    .startOf("week");
  const lastDay = dayjs()
    .year(viewYear)
    .month(viewMonth)
    .endOf("month")
    .endOf("week");

  const days = [];
  let day = firstDay;
  while (day.isBefore(lastDay) || day.isSame(lastDay)) {
    days.push(day);
    day = day.add(1, "day");
  }

  const handleSelect = (day) => {
    onChange(day.format("YYYY-MM-DD"));
    setOpen(false);
  };

  return (
    <>
      {/* Trigger */}
      <div
        className="w-full p-2 border rounded bg-white cursor-pointer"
        onClick={() => setOpen(true)}
      >
        {value ? selected.format("MMM DD, YYYY") : "Select date"}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl w-80 shadow-xl">
            {/* Header */}
            <div className="flex gap-2 mb-3">
              {/* Month Picker */}
              <select
                className="border rounded p-1 flex-1"
                value={viewMonth}
                onChange={(e) => setViewMonth(Number(e.target.value))}
              >
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((m, i) => (
                  <option key={m} value={i}>
                    {m}
                  </option>
                ))}
              </select>

              {/* Year Picker */}
              <select
                className="border rounded p-1 flex-1"
                value={viewYear}
                onChange={(e) => setViewYear(Number(e.target.value))}
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Weekday Names */}
            <div className="grid grid-cols-7 text-center text-sm text-gray-500 mb-1">
              {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((d, idx) => {
                const isCurrentMonth = d.month() === viewMonth;
                const isSelected = value && d.isSame(selected, "day");

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(d)}
                    className={`h-10 flex items-center justify-center rounded text-sm
                      ${
                        isSelected
                          ? "bg-primary text-white"
                          : isCurrentMonth
                          ? "text-black hover:bg-gray-100"
                          : "text-gray-300"
                      }
                    `}
                  >
                    {d.date()}
                  </button>
                );
              })}
            </div>

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="mt-4 w-full p-2 bg-gray-200 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DatePickerModal;
