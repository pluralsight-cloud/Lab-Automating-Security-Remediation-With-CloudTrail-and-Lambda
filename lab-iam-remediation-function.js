import { IAMClient, DeleteRolePolicyCommand } from '@aws-sdk/client-iam';

const iam = new IAMClient();

export const handler = async (event) => {
  const detail = event.detail || {};
  const eventName = detail.eventName;

  if (eventName !== 'PutRolePolicy') {
    console.log(`Ignoring event: ${eventName}`);
    return;
  }

  const params = detail.requestParameters || {};
  const roleName = params.roleName;
  const policyName = params.policyName;

  if (roleName !== 'lab-target-role') {
    console.log(`Ignoring role: ${roleName}`);
    return;
  }

  console.log(
    `Unauthorized inline policy detected: ${policyName} on role ${roleName}`,
  );
  console.log(
    `Remediating: deleting policy ${policyName} from role ${roleName}`,
  );

  await iam.send(
    new DeleteRolePolicyCommand({
      RoleName: roleName,
      PolicyName: policyName,
    }),
  );

  console.log(`Remediation complete: removed ${policyName} from ${roleName}`);
  return { status: 'remediated', role: roleName, policy: policyName };
};
