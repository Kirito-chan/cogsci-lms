export default function getGrade(percents, subjectValuation) {
  const A = parseInt(subjectValuation?.A);
  const B = parseInt(subjectValuation?.B);
  const C = parseInt(subjectValuation?.C);
  const D = parseInt(subjectValuation?.D);
  const E = parseInt(subjectValuation?.E);
  const FX = parseInt(subjectValuation?.Fx);

  const number = parseInt(percents);

  if (A >= number && number >= B) return "A";
  else if (B > number && number >= C) return "B";
  else if (C > number && number >= D) return "C";
  else if (D > number && number >= D) return "D";
  else if (E > number && number >= FX) return "E";
  else return "Fx";
}
