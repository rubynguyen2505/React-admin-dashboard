import CustomAvatar from '@/components/custom-avatar';
import { COMPANIES_LIST_QUERY } from '@/graphql/queries';
import { Company } from '@/graphql/schema.types';
import { SearchOutlined } from '@ant-design/icons';
import { CreateButton, DeleteButton, Edit, EditButton, FilterDropdown, List, useTable } from '@refinedev/antd'
import { getDefaultFilter, useGo } from '@refinedev/core';
import { Input, Space, Table } from 'antd';
import { Text } from '@/components/text';
import { currencyNumber } from '@/utilities';
export const CompanyList = ({ children }: React.PropsWithChildren) => {
  const go = useGo();
  const { tableProps, filters } = useTable({
    resource: 'companies',
    pagination: { pageSize: 12 },
    onSearch: (values) => {
      return [
        {
          field: 'name',
          operator: 'contains',
          value: values.name
        }
      ]
    },
    sorters: {
      initial: [{
        field: 'createdAt',
        order: 'desc'
      }]
    },
    filters: {
      initial: [
        {
          field: 'name',
          operator: 'contains',
          value: undefined
        }
      ]
    },
    
    meta: {
      gqlQuery: COMPANIES_LIST_QUERY
    }
  });

  return (
  <div>
    <List
      breadcrumb={false}
      headerButtons={() => (
        <CreateButton
          onClick={() => {
            go({
              to: {
                resource: 'companies',
                action: 'create'
              },
              options: {
                keepQuery: true
              },
              type: 'replace'
            })
          }}
        />
      )}
    >
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
        }}
      >
        <Table.Column<Company>
          dataIndex={'name'}
          title='Company Title'
          defaultFilteredValue={getDefaultFilter('id', filters)}
          filterIcon={<SearchOutlined/>}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder='Search Company'/>
            </FilterDropdown>
          )}
          render={(value, record) =>(
            <Space>
              <CustomAvatar
                shape='square'
                name={record.name}
                src={record.avatarUrl}
              />
              <Text style={{ whiteSpace: 'nowrap'}}>
                {record.name}
              </Text>
            </Space>
          )}
        />
        <Table.Column<Company>
          dataIndex={'totalRevenue'}
          title='Open deals amount'
          render={(value, company) =>(
            <Text>
              {currencyNumber(company?.dealsAggregate?.[0].sum?.value || 0)}
            </Text>
          )}
        />
        <Table.Column<Company>
          dataIndex={'id'}
          title='Actions'
          fixed='right'
          render={(value) =>(
            <Space>
              <EditButton
                hideText
                size='small'
                recordItemId={value}
              />
              <DeleteButton
                hideText
                size='small'
                recordItemId={value}
              />

            </Space>
          )}
        />
      </Table>
    </List>
    {children}
  </div>
  )
}
