export default function praseCookie(req) {
  const {
    headers: { cookie },
  } = req;
  return cookie.split(";").reduce((acc, curr) => {
    const res = curr.trim().split("=");
    return { ...acc, [res[0]]: res[1] };
  }, {});
}
