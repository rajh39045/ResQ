import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  Search,
  Trash2,
  Users,
  Mail,
  Shield,
} from "lucide-react";

import {
  getUsers,
  deleteUser,
} from "../api/adminApi";

function AdminUsers() {
  const [users, setUsers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers =
    async () => {
      try {
        const response =
          await getUsers();

        setUsers(
          response.data || []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete this user?"
        );

      if (!confirmDelete)
        return;

      try {
        await deleteUser(id);

        setUsers(
          users.filter(
            (user) =>
              user._id !== id
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

  const filteredUsers =
    users.filter((user) =>
      user.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const getRoleStyle =
    (role) => {
      switch (role) {
        case "ADMIN":
          return "bg-purple-500/10 text-purple-400 border-purple-500/20";

        case "MECHANIC":
          return "bg-orange-500/10 text-orange-400 border-orange-500/20";

        default:
          return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      }
    };

  return (
    <DashboardLayout>
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-4xl font-black text-white">
            Users
          </h1>

          <p className="text-slate-400 mt-2">
            Manage platform users
          </p>
        </div>

        {/* Search */}

        <div className="relative w-full md:w-80">

          <Search
            size={18}
            className="absolute left-4 top-4 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              w-full
              pl-12
              pr-4
              py-3
              bg-white/5
              border
              border-white/10
              rounded-2xl
              text-white
              placeholder:text-slate-500
              focus:border-orange-500
              outline-none
            "
          />

        </div>

      </div>

      {/* Loading */}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(
            (item) => (
              <div
                key={item}
                className="
                  h-24
                  rounded-3xl
                  bg-white/5
                  animate-pulse
                "
              />
            )
          )}
        </div>
      ) : filteredUsers.length ===
        0 ? (
        <div
          className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-12
            text-center
          "
        >
          <Users
            size={60}
            className="mx-auto text-orange-500 mb-4"
          />

          <h3 className="text-2xl font-bold text-white">
            No Users Found
          </h3>

          <p className="text-slate-400 mt-2">
            Users will appear here.
          </p>

        </div>
      ) : (
        <>
          {/* Desktop Table */}

          <div
            className="
              hidden
              lg:block
              bg-white/5
              backdrop-blur-xl
              border
              border-white/10
              rounded-3xl
              overflow-hidden
            "
          >
            <table className="w-full">

              <thead>
                <tr className="border-b border-white/10">

                  <th className="p-5 text-left text-slate-400">
                    User
                  </th>

                  <th className="p-5 text-left text-slate-400">
                    Email
                  </th>

                  <th className="p-5 text-left text-slate-400">
                    Role
                  </th>

                  <th className="p-5 text-left text-slate-400">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredUsers.map(
                  (user) => (
                    <tr
                      key={
                        user._id
                      }
                      className="
                        border-b
                        border-white/5
                        hover:bg-white/[0.03]
                        transition
                      "
                    >
                      <td className="p-5">

                        <div className="flex items-center gap-4">

                          <div
                            className="
                              w-12
                              h-12
                              rounded-full
                              bg-orange-500
                              flex
                              items-center
                              justify-center
                              text-white
                              font-bold
                            "
                          >
                            {user.name?.charAt(
                              0
                            )}
                          </div>

                          <div>
                            <p className="text-white font-medium">
                              {user.name}
                            </p>
                          </div>

                        </div>

                      </td>

                      <td className="p-5">

                        <div className="flex items-center gap-2 text-slate-300">

                          <Mail
                            size={16}
                          />

                          {user.email}

                        </div>

                      </td>

                      <td className="p-5">

                        <span
                          className={`
                            px-4
                            py-2
                            rounded-full
                            text-sm
                            border
                            ${getRoleStyle(
                              user.role
                            )}
                          `}
                        >
                          {user.role}
                        </span>

                      </td>

                      <td className="p-5">

                        <motion.button
                          whileTap={{
                            scale: 0.9,
                          }}
                          onClick={() =>
                            handleDelete(
                              user._id
                            )
                          }
                          className="
                            p-2
                            rounded-xl
                            bg-red-500/10
                            text-red-400
                            hover:bg-red-500/20
                          "
                        >
                          <Trash2
                            size={18}
                          />
                        </motion.button>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>
          </div>

          {/* Mobile Cards */}

          <div className="lg:hidden space-y-4">

            {filteredUsers.map(
              (user) => (
                <motion.div
                  key={user._id}
                  whileHover={{
                    y: -3,
                  }}
                  className="
                    bg-white/5
                    border
                    border-white/10
                    rounded-3xl
                    p-5
                  "
                >
                  <div className="flex items-center gap-4">

                    <div
                      className="
                        w-12
                        h-12
                        rounded-full
                        bg-orange-500
                        flex
                        items-center
                        justify-center
                        text-white
                        font-bold
                      "
                    >
                      {user.name?.charAt(
                        0
                      )}
                    </div>

                    <div className="flex-1">

                      <h3 className="text-white font-semibold">
                        {user.name}
                      </h3>

                      <p className="text-slate-400 text-sm">
                        {user.email}
                      </p>

                    </div>

                  </div>

                  <div className="flex justify-between items-center mt-5">

                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        border
                        ${getRoleStyle(
                          user.role
                        )}
                      `}
                    >
                      {user.role}
                    </span>

                    <button
                      onClick={() =>
                        handleDelete(
                          user._id
                        )
                      }
                      className="
                        p-2
                        rounded-xl
                        bg-red-500/10
                        text-red-400
                      "
                    >
                      <Trash2
                        size={18}
                      />
                    </button>

                  </div>

                </motion.div>
              )
            )}

          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default AdminUsers;